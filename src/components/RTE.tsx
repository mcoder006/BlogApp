// import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller, Control } from "react-hook-form";

interface RteProps {
  name?: string;
  control?: Control;
  onChange: (content: string, editor: any) => void;
  defaultValue: string;
}

const RTE = ({ name, control, onChange, defaultValue = "" }: RteProps) => {
  return (
    <div>
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            
            init={{
              initialValue: defaultValue,
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink  lists link image charmap print preview anchor code",
                "autoresize autosave bbcode colorpicker contextmenu copypaste searchreplace table textcolor visualblocks fullpage imageupload imagetools nonbreaking save statusbar tabfocus tabletools wordcount",
                "insertdatatime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | insertImage imageupload imagetools nonbreaking save statusbar tabfocus tabletools wordcount | formatselect  | bold italic underline strikethrough | alignleft aligncenter alignright | outdent indent |  blockquote code",
              content_style:
                "body { font-family: 'Roboto', sans-serif; font-size: 14px;}",
            }}
            onEditorChange={() => onchange}
          />
        )}
      />
    </div>
  );
};

export default RTE;
