export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "APIs Document",
    description: "instastore api",
    termsOfService: "",
    contact: {
      name: "Cristian",
      email: "cdcordobaa@unal",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:3003/api/v1",
      description: "Local server",
    },
    {
      url: "https://app-dev.herokuapp.com/api/v1",
      description: "DEV Env",
    },
    {
      url: "https://app-uat.herokuapp.com/api/v1",
      description: "UAT Env",
    },
  ],
  paths: {
    "/store/nearest": {
      post: {
        tags: ["store"],
        summary: "Nearest Store",
        requestBody: {
          description:
            "destination object, the who we will calculate the nearest store",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  destination: {
                    name: {
                      type: "string",
                      description: "Name of the address given by user",
                    },
                    address: {
                      type: "string",
                      description: "Address captured ",
                    },
                    address_two: {
                      type: "string",
                      description:
                        "Additional details for the address (line apt, house number, etc) ",
                    },
                    description: {
                      type: "string",
                      description: "Instructions for the delivery ",
                    },
                    country: {
                      type: "string",
                      description: "Country name",
                    },
                    city: {
                      type: "string",
                      description: "City name",
                    },
                    state: {
                      type: "string",
                      description: "State name",
                    },
                    zip_code: {
                      type: "string",
                    },
                    latitude: {
                      type: "number",
                      description:
                        "number indicating the latitude of the address provided",
                      format: "double",
                    },
                    longitude: {
                      type: "number",
                      description:
                        "number indicating the longitude of the address provided",
                      format: "double",
                    },
                  },
                },
                example: {
                  name: "Batcave",
                  address: "Wolf Man",
                  address_two: "apt 205",
                  description: "bark loudly",
                  country: "México",
                  city: "Monterrey",
                  state: "N.L.",
                  zip_code: "64570",
                  latitude: 25.691053,
                  longitude: -100.31053,
                },
                required: [
                  "name",
                  "address",
                  "city",
                  "country",
                  "state",
                  "latitude",
                  "longitude",
                ],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Nearest store in distance",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    results: {
                      id: {
                        type: "number",
                      },
                      name: {
                        type: "string",
                      },
                      is_open: {
                        type: "boolean",
                      },
                      latitude: {
                        type: "numbber",
                      },
                      longitude: {
                        type: "numbber",
                      },
                    },
                    error: {
                      type: "string",
                    },
                    info: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Invalid destination",
            content: {},
          },
        },
      },
    },
  },
  components: {
    schemas: {
      destination: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the address given by user",
          },
          address: {
            type: "string",
            description: "Address extradted from the user ",
          },
          address_two: {
            type: "string",
            description: "Additional address information",
          },
          description: {
            type: "string",
            description: "Instructions for the delivery ",
          },
          country: {
            type: "string",
            description: "Country of destination",
          },
          city: {
            type: "string",
            description: "City of destination",
          },
          state: {
            type: "string",
            description: "State of destination",
          },
          zip_code: {
            type: "string",
            description: "Zip code of the zone",
          },
          latitude: {
            type: "number",
            description: "geographical latitude of the address provided",
          },
          longitude: {
            type: "number",
            description: "geographical longitude of the address provided",
          },
        },
      },
    },
  },
};
