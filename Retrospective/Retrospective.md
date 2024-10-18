TEMPLATE FOR RETROSPECTIVE (Team #1)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done 4/3
- Total points committed vs. done 8/7
- Nr of hours planned vs. spent (as a team) 116/96

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    15   |   -    |      82h   |    63h       |
| _#1_   |     7   |   3    |   16h 30m  |    16h 30m   |
| _#3_   |     1   |   1    |      2h    |    2h        |
| _#6_   |     1   |   3    |   2h 30m   |    2h 30m    |
| _#7_   |     4   |   1    |    13h     |    12h       |
   

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  - Hours per task average (estimate) = 4h 8m
  - Hours per task average (actual) = 3h 25m
  - Standard deviation (estimate) = 1h 23m
  - Standard deviation (actual) =  51m
- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1=-0,172$$
    
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| = 0,06$$
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated = 16h
  - Total hours spent = 7h
  - Nr of automated unit test cases = 14 
  - Coverage (if available) = 88%
- E2E testing:
  - Total hours estimated = 16h
  - Total hours spent = 6h
- Code review 
  - Total hours estimated = 6h
  - Total hours spent = 9h 30m
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

We based our time estimates on the best-case scenario, which didn’t account for potential errors, conflicts, or unforeseen challenges which are very likely in a project with many interdependent parts.


- What lessons did you learn (both positive and negative) in this sprint?

	Positive:
	- We improved our collaboration especially through scrum which helped keep each other updated about our latest work.
	
	Negative: 
	- We learned that clear task definitions are crucial.	


- Which improvement goals set in the previous retrospective were you able to achieve? 
	This is our first retrospective.
  
- Which ones you were not able to achieve? Why?
	(related to previous question...)

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

1. **Optimize Code Review Process:**

Challenge: The final code review took more time than anticipated because the structure of the project on Github wasn't optimized (too many branches).
Solution: We will divide the team into smaller sub-groups to handle different sections of the code. Each sub-group will focus on reviewing a specific part, making the process more manageable. Once reviewed, these sections can be merged together more efficiently.

2. **Refine Code Structure and Database Design:**

Importance: The initial setup of the code structure and database design has a significant impact on the entire workflow.
Action Plan: Prioritize finalizing the code structure and database design at the beginning of the sprint. This will ensure smoother development and reduce the need for major changes later on.

3. **Clearer task definitions**: Define tasks more clearly upfront with proper acceptance criteria to avoid confusion during implementation.


- One thing you are proud of as a Team!!
	Adaptivity, team work, and the way we supported each other and kept the project moving forward.
