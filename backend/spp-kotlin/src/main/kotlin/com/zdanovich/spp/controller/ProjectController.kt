package com.zdanovich.spp.controller

import com.zdanovich.spp.dto.ProjectCreateRequest
import com.zdanovich.spp.dto.ProjectResponse
import com.zdanovich.spp.dto.ProjectUpdateRequest
import com.zdanovich.spp.service.ProjectService
import org.springframework.http.HttpStatus
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
@RequestMapping("/api/projects")
class ProjectController(
    private val projectService: ProjectService
) {
    @GetMapping
    fun list(): List<ProjectResponse> = projectService.getAllProjects()

    @GetMapping("/{projectId}")
    fun get(@PathVariable projectId: String): ProjectResponse =
        projectService.getProject(projectId)

    @PostMapping
    fun create(@RequestBody request: ProjectCreateRequest): ResponseEntity<ProjectResponse> {
        val created = projectService.createProject(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @PutMapping("/{projectId}")
    fun update(@PathVariable projectId: String, @RequestBody request: ProjectUpdateRequest): ProjectResponse =
        projectService.updateProject(projectId, request)

    @DeleteMapping("/{projectId}")
    fun delete(@PathVariable projectId: String): ResponseEntity<Void> {
        projectService.deleteProject(projectId)
        return ResponseEntity.noContent().build()
    }
}

