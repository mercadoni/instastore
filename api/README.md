# API Store Documentation
This API uses `POST` request to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indenticate status and errors. All responses come in standard JSON. All requests must include a `content-type` of `application/json` and the body must be valid JSON.

## Response Codes
### Response Codes
```
200: Success
400: Bad request
405: Method not allowed
50X: Server Error
```
**Request:**
```json
GET /stores HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy
```

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    stores: [
        {
            coordinates: {
                lat: xxxx,
                lon: xxxx
            },
            _id: xxx,
            name: xxx,
            phone: xxx,
            email: xxx,
            isOpen: xxx,
            nextDeliveryTime: xxxx
        }
    ]
}
```

**Request:**
```json
POST /stores HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

body {
    name: xxxx <String>,
    phone: xxx <String>,
    email: xxx <String>,
    isOpen: xxxx <String <Boolean>>,
    coordinates: {
        lat: xxxx <Number>,
        lon: xxxx <Number>
    },
    nextDeliveryTime: xxxx <Date>
}
```

**Failed Response:**
```json
HTTP/1.1 400 Bad request
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "error, ValidationError <Errors path>",
    "resolve": "The body that you provide is not correct"
}
```

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    store:
        {
            coordinates: {
                lat: xxxx,
                lon: xxxx
            },
            _id: xxx,
            name: xxx,
            phone: xxx,
            email: xxx,
            isOpen: xxx,
            nextDeliveryTime: xxxx
        }
}
```

**Request:**
```json
GET /nextStore/?lat=XXX&lon=XXX HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy
```

**Failed Response:**
```json
HTTP/1.1 400 Bad request
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "Please, provide a correct lat and lon as query parameters",
    "resolve": "Provide a correct lat and lon"
}
```

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    store:
        {
            coordinates: {
                lat: xxxx,
                lon: xxxx
            },
            _id: xxx,
            name: xxx,
            phone: xxx,
            email: xxx,
            isOpen: xxx,
            nextDeliveryTime: xxxx
        }
}
```