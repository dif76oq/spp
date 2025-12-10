package com.zdanovich.spp.graphql

import com.zdanovich.spp.dto.ProjectCreateRequest
import com.zdanovich.spp.dto.ProjectResponse
import com.zdanovich.spp.dto.ProjectUpdateRequest
import com.zdanovich.spp.service.ProjectService
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller

@Controller
class ProjectGraphQLController(
    private val projectService: ProjectService
) {
    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @QueryMapping
    fun projects(): List<ProjectResponse> = projectService.getAllProjects()

    @PreAuthorize("hasAnyRole('ADMIN','MEMBER')")
    @QueryMapping
    fun project(@Argument id: String): ProjectResponse = projectService.getProject(id)

    @PreAuthorize("hasRole('ADMIN')")
    @MutationMapping
    fun createProject(@Argument input: ProjectInput): ProjectResponse {
        val request = ProjectCreateRequest(
            name = input.name,
            description = input.description,
            members = input.members ?: emptyList()
        )
        return projectService.createProject(request)
    }

    @PreAuthorize("hasRole('ADMIN')")
    @MutationMapping
    fun updateProject(
        @Argument id: String,
        @Argument input: ProjectInput
    ): ProjectResponse {
        val request = ProjectUpdateRequest(
            name = input.name,
            description = input.description,
            members = input.members ?: emptyList()
        )
        return projectService.updateProject(id, request)
    }

    @PreAuthorize("hasRole('ADMIN')")
    @MutationMapping
    fun deleteProject(@Argument id: String): Boolean {
        projectService.deleteProject(id)
        return true
    }
}

data class ProjectInput(
    val name: String,
    val description: String? = null,
    val members: List<String>? = null
)

