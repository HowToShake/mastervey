import { Box, Divider, Drawer, FormControlLabel, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import FormInput from "@components/FormInput";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

const validationSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^\S*$/, "Whitespace is not allowed")
      .required("Survey name is required"),
    isPublic: yup.boolean(),
  })
  .required();

const AddNewSurveyDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync, isLoading } = useMutation(
    "createSurvey",
    async (body: Record<string, unknown>) => {
      const { data } = await axios.post("/createSurvey", body);
      return data;
    },
    {
      onSuccess: (data) => {
        const previousSurveys = queryClient.getQueryData("getSurveys");

        queryClient.setQueryData("getSurveys", (old: unknown[]) => [
          ...old,
          data,
        ]);
      },
    }
  );

  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
    } catch (e) {
      console.log("e === ", e);
    }
  };

  return (
    <Drawer
      sx={{ width: 250 }}
      anchor="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box
        sx={{
          width: 378,
          textAlign: "center",
          p: 2,
          pb: 6,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Add survey</Typography>
        <Divider />
        <form id="createSurvey" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            name="name"
            label="Name"
            placeholder="Name"
            errors={errors}
            defaultValue={name}
          />
          <Controller
            control={control}
            name="isPublic"
            defaultValue={true}
            render={({ field }) => {
              return (
                <FormControlLabel
                  control={<Switch defaultChecked={field.value} {...field} />}
                  label="Is survey public?"
                />
              );
            }}
          />
          <FormInput
            control={control}
            name="bgcolor"
            label="Background color"
            placeholder="Background color"
            errors={errors}
            defaultValue="#FFFFFF"
            type="color"
          />
        </form>
        <div style={{ flex: 1 }} />
        <LoadingButton
          variant="outlined"
          fullWidth
          loading={isLoading}
          form="createSurvey"
          type="submit"
        >
          Submit
        </LoadingButton>
      </Box>
    </Drawer>
  );
};

export default AddNewSurveyDrawer;
