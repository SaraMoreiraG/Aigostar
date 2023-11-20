const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const {
  DynamoDBClient,
  ScanCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

dotenv.config();
const router = express.Router();

router.use(cors());
router.use(express.json());

const dynamodbClient = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// GET route to retrieve all items from the table
router.get("/full", (req, res) => {
  const scanParams = {
    TableName: "matches",
  };

  dynamodbClient
    .send(new ScanCommand(scanParams))
    .then((data) => {
      // Process the items to convert attribute values to plain JavaScript types
      const items = data.Items.map((item) => {
        const unmarshalledItem = unmarshall(item);
        // Convert attribute values to plain JavaScript types
        Object.keys(unmarshalledItem).forEach((key) => {
          const value = unmarshalledItem[key];
          if (value && typeof value === "object" && value.hasOwnProperty("N")) {
            unmarshalledItem[key] = parseInt(value.N);
          } else if (value.hasOwnProperty("S")) {
            unmarshalledItem[key] = value.S;
          }
        });
        return unmarshalledItem;
      });

      res.json(items);
    })
    .catch((err) => {
      console.error("DynamoDB scan error:", err);
      res.status(500).send("Server Error");
    });
});

// GET route to retrieve the first 5 items from the table
router.get("/onlyfive", (req, res) => {
  const scanParams = {
    TableName: "matches",
    Limit: 5, // Limit the result to the first 5 items
  };

  dynamodbClient
    .send(new ScanCommand(scanParams))
    .then((data) => {
      // Process the items to convert attribute values to plain JavaScript types
      const items = data.Items.map((item) => {
        const unmarshalledItem = unmarshall(item);
        // Convert attribute values to plain JavaScript types
        Object.keys(unmarshalledItem).forEach((key) => {
          const value = unmarshalledItem[key];
          if (value && typeof value === "object" && value.hasOwnProperty("N")) {
            unmarshalledItem[key] = parseInt(value.N);
          } else if (value.hasOwnProperty("S")) {
            unmarshalledItem[key] = value.S;
          }
        });
        return unmarshalledItem;
      });

      res.json(items);
    })
    .catch((err) => {
      console.error("DynamoDB scan error:", err);
      res.status(500).send("Server Error");
    });
});

// Update items
router.put("/update/:itemId", (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);

  const updatedData = req.body;
  const updateExpression = [];
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  // Check and update multiple attributes
  if (typeof updatedData.date === "string") {
    updateExpression.push("#date = :date");
    expressionAttributeNames["#date"] = "date";
    expressionAttributeValues[":date"] = { S: updatedData.date };
  }

  if (typeof updatedData.hour === "string") {
    updateExpression.push("#hour = :hour");
    expressionAttributeNames["#hour"] = "hour";
    expressionAttributeValues[":hour"] = { S: updatedData.hour };
  }

  if (typeof updatedData.place === "string") {
    updateExpression.push("#place = :place");
    expressionAttributeNames["#place"] = "place";
    expressionAttributeValues[":place"] = { S: updatedData.place };
  }

  if (typeof updatedData.homeTeam === "string") {
    updateExpression.push("#homeTeam = :homeTeam");
    expressionAttributeNames["#homeTeam"] = "homeTeam";
    expressionAttributeValues[":homeTeam"] = { S: updatedData.homeTeam };
  }

  if (typeof updatedData.visitorTeam === "string") {
    updateExpression.push("#visitorTeam = :visitorTeam");
    expressionAttributeNames["#visitorTeam"] = "visitorTeam";
    expressionAttributeValues[":visitorTeam"] = { S: updatedData.visitorTeam };
  }

  const updateCommand = {
    TableName: "matches",
    Key: {
      id: { N: itemId.toString() },
    },
    UpdateExpression: "SET " + updateExpression.join(", "),
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: marshall(expressionAttributeValues),
  };

  dynamodbClient
    .send(new UpdateItemCommand(updateCommand))
    .then((data) => {
      console.log("Item successfully updated in DynamoDB.");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("DynamoDB update error:", err);
      res.status(500).send("Server Error");
    });
});

// Delete items
router.delete("/delete/:itemId", (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);

  const deleteParams = {
    TableName: "matches",
    Key: {
      id: { N: itemId.toString() },
    },
  };

  dynamodbClient
    .send(new DeleteItemCommand(deleteParams))
    .then(() => {
      console.log("Item deleted successfully.");
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("DynamoDB delete error:", err);
      res.status(500).send("Server Error");
    });
});

// Create Item
router.post("/add", async (req, res) => {
  const newOrder = req.body;

  if (!newOrder) {
    return res.status(400).json({ error: "No hay datos para la nueva orden" });
  }

  try {
    const newOrderParams = {
      TableName: "orders",
      Item: {
        id: { S: newOrder.stripeId },
        nombre: { S: newOrder.nombre },
        apellidos: { S: newOrder.apellidos },
        email: { S: newOrder.email },
        direccion: { S: newOrder.direccion },
        cp: { S: newOrder.cp.toString() },
        ciudad: { S: newOrder.ciudad },
        status: { S: newOrder.status },
        total: { S: newOrder.total.toString() },
        products: { L: [] },
      },
    };

        // Add products to the products array
        newOrder.products.forEach((product, index) => {
          const productItem = {
            M: {
              id: { N: product.id.toString() },
              name: { S: product.name },
              img: { S: product.img },
              category: { S: product.category },
              quantity: { S: product.quantity.toString() },
              price: { S: product.price.toString() },
            },
          };

          // Optional parameters
          if (product.size) {
            productItem.M.size = { S: product.size };
          }

          if (product.color) {
            productItem.M.color = { S: product.color };
          }

          newOrderParams.Item.products.L.push(productItem);
        });

    console.log("newOrderParams", newOrderParams);
    // Use DynamoDBClient to send the PutItemCommand
    dynamodbClient
      .send(new PutItemCommand(newOrderParams))
      .then(() => {
        res.status(201).json({
          message: "New order created successfully",
        });
      })
      .catch((err) => {
        console.error("Error adding new order:", err);
        res
          .status(500)
          .json({ error: "An error occurred while creating the order" });
      });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Adding Error" });
  }
});

module.exports = router;
