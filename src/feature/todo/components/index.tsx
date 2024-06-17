import {
  Box,
  Button,
  Flex,
  FormInput,
  IconButton,
  Text,
} from "@sparrowengg/twigs-react";
import {
  CloseCircleIcon,
  DeleteIcon,
  PencilIcon,
  SaveIcon,
  TextAlignJustifyIcon,
} from "@sparrowengg/twigs-react-icons";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { nanoid } from "nanoid";

import React, { useState } from "react";

type FormValues = {
  todo: {
    id: string;
    note: string;
  }[];
};

const Todo = () => {
  const [editIndex, setEditIndex] = useState<number | null>(0);

  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      todo: [{ id: nanoid(10), note: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray<FormValues>({
    name: "todo",
    control,
  });

  const formSubmit = (data: FormValues) => {
    console.log(data)
    setEditIndex(null)
  };

  const handleSave = handleSubmit((data) => {
    formSubmit(data);
  });
  const handleChange = (e) => {
    if (e.charCode === 13) {
      handleSave();
    }
  };

  return (
    <Flex
      css={{
        margin: "$10",
        flexDirection: "column",
        gap: "$5",
      }}
    >
      {/* <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        // onSubmit={handleSubmit(formSubmit)}
      > */}
      {fields.map((field, index) => {
        return (
          <Flex
            css={{
              background: "$secondary100",
              width: "100%",
              padding: "$10",
              gap: "$2",
              borderRadius: "$md",
              alignItems: "center",
            }}
            key={field.id}
          >
            <Box
              css={{
                width: "50%",
              }}
            >
              {editIndex === index ? (
                <FormInput
                  {...register(`todo.${index}.note` as const, {
                    required: true,
                  })}
                  placeholder="Add your note"
                  onKeyPress={(e) => handleChange(e)}
                />
              ) : (
                <Text size="md">{watch(`todo.${index}.note`)}</Text>
              )}
            </Box>
            <Flex
              css={{
                width: "50%",
                justifyContent: "flex-end",
                gap: "$4",
              }}
            >
              {editIndex === index ? (
                <>
                  <IconButton
                    size="md"
                    icon={<SaveIcon />}
                    onClick={() => handleSave(index)}
                  />
                  <IconButton
                    size="md"
                    icon={<CloseCircleIcon />}
                    onClick={() => setEditIndex(null)}
                  />
                </>
              ) : (
                <>
                  <IconButton
                    size="md"
                    icon={<PencilIcon />}
                    onClick={() => setEditIndex(index)}
                  />
                  <IconButton
                    size="md"
                    icon={<DeleteIcon />}
                    onClick={() => remove(index)}
                  />
                </>
              )}
            </Flex>
          </Flex>
        );
      })}
      <Flex css={{
        gap:"$5"
      }}>
        <Button
          size="md"
          css={{
            width: "10%",
          }}
          onClick={() => {
            append({
              id: nanoid(10),
              note: "",
            });
            setEditIndex(fields.length);
          }}
          disabled={editIndex !== null}
        >
          Add
        </Button>
        <Button
          size="md"
          css={{
            width: "10%",
          }}
          onClick={handleSubmit(formSubmit)}
          disabled={editIndex !== null}
        >
          Submit All
        </Button>
      </Flex>

      {/* </form> */}
    </Flex>
  );
};

export default Todo;
