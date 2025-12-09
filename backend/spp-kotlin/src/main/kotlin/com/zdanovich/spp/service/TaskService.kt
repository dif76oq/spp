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
import org.springframework.stereotype.Service

@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val projectRepository: ProjectRepository
) {
    fun getTasksByProject(projectId: String): List<TaskResponse> {
        ensureProjectExists(projectId)
        return taskRepository.findByProjectId(projectId).map { it.toResponse() }
    }

    fun createTask(projectId: String, request: TaskCreateRequest): TaskResponse {
        ensureProjectExists(projectId)

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

        task.title = validateTitle(request.title)
        task.description = request.description
        task.status = TaskStatus.fromLabel(request.status)
        task.assignee = request.assignee

        return taskRepository.save(task).toResponse()
    }

    fun deleteTask(taskId: String) {
        if (!taskRepository.existsById(taskId)) {
            throw ResourceNotFoundException("Задача с id $taskId не найдена")
        }
        taskRepository.deleteById(taskId)
    }

    private fun ensureProjectExists(projectId: String) {
        if (!projectRepository.existsById(projectId)) {
            throw ResourceNotFoundException("Проект с id $projectId не найден")
        }
    }

    private fun validateTitle(title: String): String {
        val trimmed = title.trim()
        if (trimmed.isEmpty()) {
            throw BadRequestException("Название задачи не может быть пустым")
        }
        return trimmed
    }
}

