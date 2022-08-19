import React from 'react';

interface InlineEditorProps {
  modeEditComponent: React.ReactNode;
}

type ModeType = 'view' | 'edit';

export const InlineEditor: React.FC<InlineEditorProps> = ({ modeEditComponent }) => {
  const [mode, setMode] = React.useState<ModeType>('view');

  return <div contentEditable></div>;
};
