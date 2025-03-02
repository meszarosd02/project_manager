export const defaultProject: Project = {
    id: -1,
    name: "placeholder project",
    tasks: []
}

export const defaultUser: User = {
    id: -1,
    username: "placeholder user",
    firstName: "John",
    lastName: "Doe",
    projects: [defaultProject],
    createdAt: new Date()
}