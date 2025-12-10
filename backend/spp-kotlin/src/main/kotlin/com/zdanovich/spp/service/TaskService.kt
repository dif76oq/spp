package com.zdanovich.spp.service

import com.zdanovich.spp.dto.TaskCreateRequest
import com.zdanovich.spp.dto.TaskResponse
import com.zdanovich.spp.dto.TaskUpdateRequest
import com.zdanovich.spp.entity.TaskEntity
import com.zdanovich.spp.entity.TaskStatus
import com.zdanovich.spp.exception.BadRequestException
import com.zdanovich.spp.exception.ResourceNotFoundException
import com.zdanovich.spp.repository.ProjectRepository
import com.zdanovich.spp.repository.TaskRepository
import com.zdanovich.spp.security.SecurityUtil
import org.springframework.security.access.AccessDeniedException
import org.springframework.stereotype.Service

@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val projectRepository: ProjectRepository
) {
    fun getTasksByProject(projectId: String): List<TaskResponse> {
        ensureProjectAccess(projectId)
        return taskRepository.findByProjectId(projectId).map { it.toResponse() }
    }

    fun getTask(taskId: String): TaskResponse {
        val task = taskRepository.findById(taskId)
            .orElseThrow { ResourceNotFoundException("Задача с id $taskId не найдена") }
        ensureTaskAccess(task)
        return task.toResponse()
    }

    fun createTask(projectId: String, request: TaskCreateRequest): TaskResponse {
        ensureProjectAccess(projectId)

        val title = validateTitle(request.title)

        val task = TaskEntity(
            title = title,
            description = request.description,
            status = TaskStatus.fromLabel(request.status),
            assignee = request.assignee,
            projectId = projectId
        )

        return taskRepository.save(task).toResponse()
    }

    fun updateTask(taskId: String, request: TaskUpdateRequest): TaskResponse {
        val task = taskRepository.findById(taskId)
            .orElseThrow { ResourceNotFoundException("Задача с id $taskId не найдена") }

        ensureTaskAccess(task)
        task.title = validateTitle(request.title)
        task.description = request.description
        task.status = TaskStatus.fromLabel(request.status)
        task.assignee = request.assignee

        return taskRepository.save(task).toResponse()
    }

    fun deleteTask(taskId: String) {
        val task = taskRepository.findById(taskId)
            .orElseThrow { ResourceNotFoundException("Задача с id $taskId не найдена") }

        ensureTaskAccess(task)
        taskRepository.delete(task)
    }
    private fun ensureProjectAccess(projectId: String) {
        val project = projectRepository.findById(projectId)
            .orElseThrow { ResourceNotFoundException("Проект с id $projectId не найден") }

        if (SecurityUtil.isAdmin()) {
            return
        }

        val login = SecurityUtil.requireAuthenticated()
        if (!project.members.contains(login)) {
            throw AccessDeniedException("Нет доступа к проекту")
        }
    }

    private fun ensureTaskAccess(task: TaskEntity) {
        ensureProjectAccess(task.projectId)
    }

    private fun validateTitle(title: String): String {
        val trimmed = title.trim()
        if (trimmed.isEmpty()) {
            throw BadRequestException("Название задачи не может быть пустым")
        }
        return trimmed
    }
}

