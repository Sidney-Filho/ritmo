# Ritmo

A personal planning app that helps users organize their week
based on the time they actually have available.

## Problem

Balancing work, personal projects, and everyday responsibilities
can make weekly planning difficult. A task list alone does not
show whether everything fits into the available time.

## Solution

Ritmo connects tasks, priorities, and time estimates in a weekly
view, helping users build a realistic plan.

## MVP Features

- Create, edit, delete, and complete tasks.
- Assign tasks to a specific date.
- Set task priority: low, medium, or high.
- Estimate task duration in minutes.
- Define available time for each day.
- View tasks for the current week.
- Compare planned task duration with daily availability.
- Highlight days that exceed the available time.

## Main User Flow

1. Set the available time for each day.
2. Create a task with a priority and estimated duration.
3. Assign the task to a date.
4. Review the weekly plan.
5. Adjust overloaded days.
6. Mark completed tasks.

## Future Improvements

- Monthly goals.
- Project management.
- Authentication and cloud synchronization.
- Calendar integrations.
- Weekly progress reports.

## Planned Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase / PostgreSQL for a later cloud persistence phase

## Initial Data Storage

The MVP will store data locally in the browser using localStorage.
Authentication and cloud persistence will be added later.

## Project Status

Planning and initial development.
