export const POST_SCHEMA = {
    email: { type: "string" },
    firstname: { type: "string" },
    lastname: { type: "string" },
}

export const GET_SCHEMA = {
    id: { type: "string" }
}

export const DELETE_SCHEMA = {
    id: { type: "string" }
}

export const PUT_SCHEMA = {
    id: { type: "string" },
    data: { type: "object", props: POST_SCHEMA }
}