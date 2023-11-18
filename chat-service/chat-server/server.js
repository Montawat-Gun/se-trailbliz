const mongoose = require("mongoose");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const ChatModel = require("./model/chat-schema");
require("dotenv/config");

const PROTO_PATH = "./chat.proto";

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "chat-service-gRPC",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const chatProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(chatProto.ChatService.service, {
  CreateNewChat: async (call, callback) => {
    try {
      const chat = new ChatModel({
        data: call.request.data,
      });
      const savedChat = await chat.save();

      if (!savedChat) {
        console.error("Chat was not saved for an unknown reason");
        callback({
          code: grpc.status.INTERNAL,
          details: "Chat was not saved for an unknown reason.",
        });
        return;
      }
      callback(null, savedChat);
    } catch (error) {
      console.error("Error while saving chat:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Failed to create chat.",
      });
    }
  },

  GetChatById: async (call, callback) => {
    try {
      const chat = await ChatModel.findById(call.request.id);
      if (chat) {
        callback(null, chat);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "NOT FOUND ID",
        });
      }
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: "Failed to read item.",
      });
    }
  },

  InsertDataToChatById: async (call, callback) => {
    try {
      const { data, id } = call.request;
      console.log(call.request)
      if (!data || !id) {
        callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: "Message or ID is missing from the request.",
        });
        return;
      }

      data.timestamp = Math.floor(Date.now() / 1000); // Convert current time to seconds.

      const updatedChat = await ChatModel.findByIdAndUpdate(
        id,
        {
          $push: { data: data },
        },
        { new: true }
      );

      if (updatedChat) {
        callback(null, updatedChat);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Chat not found.",
        });
      }
    } catch (error) {
      console.error("Error in InsertDataToChatById:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Failed to insert message to chat.",
      });
    }
  },
});

// server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), () => {
//   server.start();
// });

server.bindAsync("0.0.0.0:30043", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});

// console.log("Server running at http://127.0.0.1:30043");
console.log("Server running at http://0.0.0.0:30043");