import request from 'supertest';
import app from '../app';
import verify from '../routes/verify'; 
import login from '../routes/login';
// Ensure your Express app is properly exported

describe('Login API', () => {
  it('should log in successfully with valid credentials', async () => {
    const response = await request(login)
      .post('/login')
      .send({
        email: 'valid_user@example.com',
        password: 'correct_password',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Log in successful');
    expect(response.body.data).toBeDefined();
  });

  it('should return an error for invalid password', async () => {
    const response = await request(login)
      .post('/login')
      .send({
        email: 'valid_user@example.com',
        password: 'wrong_password',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid password');
  });

  it('should return a 404 for non-existent user', async () => {
    const response = await request(login)
      .post('/login')
      .send({
        email: 'nonexistent_user@example.com',
        password: 'password',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User does not exist. Please sign up.');
  });
});

//test 2
describe("Sign in API", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data between tests
  });

  it("should add a new user and return a success response", async () => {
    // Arrange
    const hashedPassword = "hashedPassword123";
    HashedPassword.mockReturnValue(hashedPassword);

    const mockResult = {
      affectedRows: 1,
      insertId: 42,
    };
    connection.execute.mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const userData = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      is_admin: false,
      token: "dummyToken123",
    };

    // Act
    const response = await request(app).post("/signin").send(userData);

    // Assert
    expect(HashedPassword).toHaveBeenCalledWith("password123");
    expect(connection.execute).toHaveBeenCalledWith(
      "INSERT INTO user_data (`first_name`, `last_name`, `email`,`password`, `is_admin`, `token`) Values(?,?,?,?,?,?)",
      [
        "John",
        "Doe",
        "john.doe@example.com",
        hashedPassword,
        false,
        "dummyToken123",
      ],
      expect.any(Function)
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: "User has been added",
      data: mockResult,
    });
  });

  it("should return an error response if the database fails", async () => {
    // Arrange
    const errorMessage = "Database error";
    connection.execute.mockImplementation((query, params, callback) => {
      callback(new Error(errorMessage), null);
    });

    const userData = {
      first_name: "Jane",
      last_name: "Doe",
      email: "jane.doe@example.com",
      password: "password123",
      is_admin: true,
      token: "dummyToken456",
    };

    // Act
    const response = await request(app).post("/signin").send(userData);

    // Assert
    expect(connection.execute).toHaveBeenCalledWith(
      "INSERT INTO user_data (`first_name`, `last_name`, `email`,`password`, `is_admin`, `token`) Values(?,?,?,?,?,?)",
      [
        "Jane",
        "Doe",
        "jane.doe@example.com",
        expect.any(String), // The hashed password
        true,
        "dummyToken456",
      ],
      expect.any(Function)
    );
    expect(response.statusCode).toBe(200); // Your API responds with status 200 even for errors
    expect(response.body).toBe(errorMessage);
  });
});

//test 3
describe("POST /verify", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data between tests
  });

  it("should return success when the verification code matches", async () => {
    // Arrange
    const mockUser = {
      email: "test@example.com",
      token: 1234,
    };
    const mockResult = [{ ...mockUser }];
    connection.execute.mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const requestBody = {
      email: "test@example.com",
      code: 1234,
    };

    // Act
    const response = await request(app).post("/verify").send(requestBody);

    // Assert
    expect(connection.execute).toHaveBeenCalledWith(
      "Select * from user_data WHERE email=?",
      ["test@example.com"],
      expect.any(Function)
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: "Verification successful",
      data: mockResult,
    });
  });

  it("should return an error when the verification code does not match", async () => {
    // Arrange
    const mockUser = {
      email: "test@example.com",
      token: 1234,
    };
    const mockResult = [{ ...mockUser }];
    connection.execute.mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const requestBody = {
      email: "test@example.com",
      code: 5678,
    };

    // Act
    const response = await request(app).post("/verify").send(requestBody);

    // Assert
    expect(connection.execute).toHaveBeenCalledWith(
      "Select * from user_data WHERE email=?",
      ["test@example.com"],
      expect.any(Function)
    );
    expect(response.statusCode).toBe(200); // Your API responds with 200 even for errors
    expect(response.body).toEqual({
      status: 400,
      message: "Inccorect verification code",
      data: [],
    });
  });

  it("should handle a database error gracefully", async () => {
    // Arrange
    const errorMessage = "Database error";
    connection.execute.mockImplementation((query, params, callback) => {
      callback(new Error(errorMessage), null);
    });

    const requestBody = {
      email: "test@example.com",
      code: 1234,
    };

    // Act
    const response = await request(app).post("/verify").send(requestBody);

    // Assert
    expect(connection.execute).toHaveBeenCalledWith(
      "Select * from user_data WHERE email=?",
      ["test@example.com"],
      expect.any(Function)
    );
    expect(response.statusCode).toBe(500); // Handle the error properly in your actual API
    expect(response.body).toEqual({ error: errorMessage }); // Adjust this based on your API's error handling
  });
});