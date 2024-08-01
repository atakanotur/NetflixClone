import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  emailOrPhoneNumber: z.string(),
  password: z.string(),
});

type LoginFormFields = z.infer<typeof loginSchema>;

const useLoginForm = () => {
  return useForm<LoginFormFields>({
    defaultValues: {
      emailOrPhoneNumber: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
};

export { useLoginForm };
