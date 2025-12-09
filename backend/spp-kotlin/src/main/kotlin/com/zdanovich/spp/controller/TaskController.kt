package com.zdanovich.spp.controller

import com.zdanovich.spp.dto.TaskCreateRequest
import com.zdanovich.spp.dto.TaskResponse
import com.zdanovich.spp.dto.TaskUpdateRequest
import com.zdanovich.spp.service.TaskService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class TaskController(
    private val taskService: TaskService
) {
    @GetMapping("/projects/{projectId}/tasks")
    fun list(@PathVariable projectId: String): List<TaskResponse> =
        taskService.getTasksByProject(projectId)

    @PostMapping("/projects/{projectId}/tasks")
    fun create(
        @PathVariable projectId: String,
        @RequestBody request: TaskCreateRequest
    ): TaskResponse = taskService.createTask(projectId, request)

    @PutMapping("/tasks/{taskId}")
    fun update(
        @PathVariable taskId: String,
        @RequestBody request: TaskUpdateRequest
    ): TaskResponse = taskService.updateTask(taskId, request)

    @DeleteMapping("/tasks/{taskId}")
    fun delete(@PathVariable taskId: String): ResponseEntity<Void> {
        taskService.deleteTask(taskId)
        return ResponseEntity.noContent().build()
    }
}

