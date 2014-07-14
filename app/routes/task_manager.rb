class TaskManager < Cuba
  define do

    on put do
      # PUT /tasks/:id -> edit a task
      on ":id" do |id|
        task = Task.find(id)

        on param("task") do |task_attributes|
          if task.update_attributes task_attributes
            res.write task.to_json
          else
            res.status = 422
            res.write task.errors.to_json
          end
        end
      end
    end

  end
end
