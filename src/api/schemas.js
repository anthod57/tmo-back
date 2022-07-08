export const POST_SCHEMA = {
    email: { type: "string" },
    firstname: { type: "string" },
    lastname: { type: "string" },
}

export const GET_SCHEMA = {
    id: { type: "number" }
}

export const DELETE_SCHEMA = {
    id: { type: "number" }
}

export const PUT_SCHEMA = {
    id: { type: "number" },
    offer: { type: "object", props: POST_SCHEMA }
}