import { Router } from "express";
import { connection } from "../database/database.js";

const update_prereqs = Router();

update_prereqs.post('/update-prereqs', async (req, res) => {
    const selected = req.body.enabled_Courses; // { courseId: enabledStatus, ... }

    try {
        // Collect all update promises
        const updatePromises = Object.entries(selected).map(([courseId, enabledStatus]) => {
            return new Promise((resolve, reject) => {
                connection.execute(
                    "UPDATE `prerequisites` SET `enabled` = ?, `term` = ? WHERE `prerequisites`.`id` = ?", 
                    [enabledStatus, req.body.term, courseId],
                    function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        });

        // Wait for all updates to complete
        const results = await Promise.all(updatePromises);

        // Send a single response after all updates are done
        res.status(200).json({
            status: 200,
            message: "Courses updated successfully",
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error updating courses",
            error: error.message,
        });
    }
});

export default update_prereqs;
