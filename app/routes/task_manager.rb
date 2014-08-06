class TaskManager < Cuba
  define do

    on post do
      on param("task") do |task_attributes|
        task = Task.new(task_attributes)

        if task.save
          res.write task.to_json
        else
          res.status = 422
          res.write task.errors.to_json
        end
      end
    end

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
