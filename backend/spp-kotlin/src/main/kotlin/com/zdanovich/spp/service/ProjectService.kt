package com.zdanovich.spp.service

import com.zdanovich.spp.dto.ProjectCreateRequest
import com.zdanovich.spp.dto.ProjectResponse
import com.zdanovich.spp.dto.ProjectUpdateRequest
import com.zdanovich.spp.entity.ProjectEntity
import com.zdanovich.spp.exception.BadRequestException
import com.zdanovich.spp.exception.ResourceNotFoundException
import com.zdanovich.spp.repository.ProjectRepository
import com.zdanovich.spp.repository.TaskRepository
import com.zdanovich.spp.security.SecurityUtil
import org.springframework.security.access.AccessDeniedException
import org.springframework.stereotype.Service

@Service
class ProjectService(
    private val projectRepository: ProjectRepository,
    private val taskRepository: TaskRepository
) {
    fun getAllProjects(): List<ProjectResponse> {
        val projects = if (SecurityUtil.isAdmin()) {
            projectRepository.findAll()
        } else {
            val login = SecurityUtil.requireAuthenticated()
            projectRepository.findAll().filter { it.members.contains(login) }
        }
        return projects.map { mapProject(it) }
    }

    fun getProject(projectId: String): ProjectResponse {
        val project = findProject(projectId)
        ensureAccess(project)
        return mapProject(project)
    }

    fun createProject(request: ProjectCreateRequest): ProjectResponse {
        ensureAdmin()
        val project = ProjectEntity(
            name = validateName(request.name),
            description = request.description,
            members = sanitizeMembers(request.members)
        )
        val saved = projectRepository.save(project)
        return mapProject(saved)
    }

    fun updateProject(projectId: String, request: ProjectUpdateRequest): ProjectResponse {
        ensureAdmin()
        val project = findProject(projectId)
        project.name = validateName(request.name)
        project.description = request.description
        project.members = sanitizeMembers(request.members)

        val updated = projectRepository.save(project)
        return mapProject(updated)
    }

    fun deleteProject(projectId: String) {
        ensureAdmin()
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

    private fun ensureAdmin() {
        if (!SecurityUtil.isAdmin()) {
            throw AccessDeniedException("Недостаточно прав")
        }
    }

    private fun findProject(projectId: String): ProjectEntity =
        projectRepository.findById(projectId)
            .orElseThrow { ResourceNotFoundException("Проект с id $projectId не найден") }

    private fun ensureAccess(project: ProjectEntity) {
        if (SecurityUtil.isAdmin()) return
        val login = SecurityUtil.requireAuthenticated()
        if (!project.members.contains(login)) {
            throw AccessDeniedException("Нет доступа к проекту")
        }
    }
}

