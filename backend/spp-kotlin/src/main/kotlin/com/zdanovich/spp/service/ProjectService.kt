package com.zdanovich.spp.service

import com.zdanovich.spp.dto.ProjectCreateRequest
import com.zdanovich.spp.dto.ProjectResponse
import com.zdanovich.spp.dto.ProjectUpdateRequest
import com.zdanovich.spp.entity.ProjectEntity
import com.zdanovich.spp.exception.BadRequestException
import com.zdanovich.spp.exception.ResourceNotFoundException
import com.zdanovich.spp.repository.ProjectRepository
import com.zdanovich.spp.repository.TaskRepository
import org.springframework.stereotype.Service

@Service
class ProjectService(
    private val projectRepository: ProjectRepository,
    private val taskRepository: TaskRepository
) {
    fun getAllProjects(): List<ProjectResponse> =
        projectRepository.findAll().map { mapProject(it) }

    fun getProject(projectId: String): ProjectResponse =
        projectRepository.findById(projectId)
            .orElseThrow { ResourceNotFoundException("Проект с id $projectId не найден") }
            .let { mapProject(it) }

    fun createProject(request: ProjectCreateRequest): ProjectResponse {
        val project = ProjectEntity(
            name = validateName(request.name),
            description = request.description,
            members = sanitizeMembers(request.members)
        )
        val saved = projectRepository.save(project)
        return mapProject(saved)
    }

    fun updateProject(projectId: String, request: ProjectUpdateRequest): ProjectResponse {
        val project = projectRepository.findById(projectId)
            .orElseThrow { ResourceNotFoundException("Проект с id $projectId не найден") }

        project.name = validateName(request.name)
        project.description = request.description
        project.members = sanitizeMembers(request.members)

        val updated = projectRepository.save(project)
        return mapProject(updated)
    }

    fun deleteProject(projectId: String) {
        if (!projectRepository.existsById(projectId)) {
            throw ResourceNotFoundException("Проект с id $projectId не найден")
        }
        projectRepository.deleteById(projectId)
        taskRepository.deleteByProjectId(projectId)
    }

    private fun mapProject(project: ProjectEntity): ProjectResponse {
        val id = requireNotNull(project.id)
        val tasks = taskRepository.findByProjectId(id).map { it.toResponse() }
        return ProjectResponse(
            id = id,
            name = project.name,
            description = project.description,
            members = project.members.toList(),
            tasks = tasks
        )
    }

    private fun validateName(name: String): String {
        val trimmed = name.trim()
        if (trimmed.isEmpty()) {
            throw BadRequestException("Название проекта не может быть пустым")
        }
        return trimmed
    }

    private fun sanitizeMembers(members: List<String>): MutableList<String> =
        members.mapNotNull { it.trim().takeIf { trimmed -> trimmed.isNotEmpty() } }
            .toMutableList()
}

