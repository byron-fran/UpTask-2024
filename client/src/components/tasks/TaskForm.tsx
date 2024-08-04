import { FieldErrors, UseFormRegister } from "react-hook-form"
import { taskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<taskFormData>
    register: UseFormRegister<taskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Name of task</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name of task"
                    className="w-full p-3  border-gray-300 border"
                    {...register("name", {
                        required: "required",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Description</label>
                <textarea
                    id="description"
                    placeholder="Description"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "Description is required"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}