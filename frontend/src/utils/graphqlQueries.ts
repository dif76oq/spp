export const GET_PROJECTS = `
  query GetProjects {
    projects {
      id
      name
      description
      members
      tasks {
        id
        title
        description
        status
        assignee
        projectId
      }
    }
  }
`;

export const GET_PROJECT = `
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      members
      tasks {
        id
        title
        description
        status
        assignee
        projectId
      }
    }
  }
`;

export const CREATE_PROJECT = `
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
      members
      tasks {
        id
        title
        description
        status
        assignee
        projectId
      }
    }
  }
`;

export const UPDATE_PROJECT = `
  mutation UpdateProject($id: ID!, $input: ProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      description
      members
      tasks {
        id
        title
        description
        status
        assignee
        projectId
      }
    }
  }
`;

export const DELETE_PROJECT = `
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;

export const GET_TASKS = `
  query GetTasks($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      title
      description
      status
      assignee
      projectId
    }
  }
`;

export const GET_TASK = `
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      assignee
      projectId
    }
  }
`;

export const CREATE_TASK = `
  mutation CreateTask($projectId: ID!, $input: TaskInput!) {
    createTask(projectId: $projectId, input: $input) {
      id
      title
      description
      status
      assignee
      projectId
    }
  }
`;

export const UPDATE_TASK = `
  mutation UpdateTask($id: ID!, $input: TaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      status
      assignee
      projectId
    }
  }
`;

export const DELETE_TASK = `
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

