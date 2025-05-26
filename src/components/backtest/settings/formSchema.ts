import { z } from "zod";

export const formSchema = z.object({
  strategy: z.string().min(1, "Strategy is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  initialCapital: z.coerce.number().min(1, "Initial capital must be at least 1"),
  positionSize: z.coerce.number().min(1, "Position size must be at least 1"),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: Partial<FormValues> = {
  strategy: "My New Strategy",
  startDate: new Date(2024, 3, 16), // Apr 16, 2024
  endDate: new Date(2024, 3, 26), // Apr 26, 2024
  initialCapital: 10000,
  positionSize: 5,
};
