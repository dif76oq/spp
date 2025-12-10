package com.zdanovich.spp.graphql

import com.zdanovich.spp.dto.TaskCreateRequest
import com.zdanovich.spp.dto.TaskResponse
import com.zdanovich.spp.dto.TaskUpdateRequest
import com.zdanovich.spp.service.TaskService
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller

@Controller
class TaskGraphQLController(
    private val taskService: TaskService
) {
    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @QueryMapping
    fun tasks(@Argument projectId: String): List<TaskResponse> =
        taskService.getTasksByProject(projectId)

    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @QueryMapping
    fun task(@Argument id: String): TaskResponse = taskService.getTask(id)

    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @MutationMapping
    fun createTask(
        @Argument projectId: String,
        @Argument input: TaskInput
    ): TaskResponse {
        val request = TaskCreateRequest(
            title = input.title,
            description = input.description,
            status = input.status,
            assignee = input.assignee
        )
        return taskService.createTask(projectId, request)
    }

    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @MutationMapping
    fun updateTask(
        @Argument id: String,
        @Argument input: TaskInput
    ): TaskResponse {
        val request = TaskUpdateRequest(
            title = input.title,
            description = input.description,
            status = input.status,
            assignee = input.assignee
        )
        return taskService.updateTask(id, request)
    }

    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @MutationMapping
    fun deleteTask(@Argument id: String): Boolean {
        taskService.deleteTask(id)
        return true
    }
}

data class TaskInput(
    val title: String,
    val description: String? = null,
    val status: String? = null,
    val assignee: String? = null
)

