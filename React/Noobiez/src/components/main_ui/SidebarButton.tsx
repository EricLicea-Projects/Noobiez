import { Button } from "@chakra-ui/react";

interface Props {
  name: string;
  disabled?: boolean;
}

const SidebarButton = ({ name, disabled }: Props) => {
  const buttonColorScheme = disabled ? "facebook" : "teal";

  return (
    <Button
      onClick={() => console.log({ name })}
      colorScheme={buttonColorScheme}
      variant="ghost"
      size="lg"
      w="full"
      justifyContent="flex-start"
      disabled={disabled}
    >
      {name}
    </Button>
  );
};

export default SidebarButton;
