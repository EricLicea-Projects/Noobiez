import { Button } from "@chakra-ui/react";

interface Props {
  name: string;
}

const SidebarButton = ({ name }: Props) => {
  return (
    <Button
      onClick={() => console.log({ name })}
      colorScheme="teal"
      variant="ghost"
      size="lg"
      w="full"
      justifyContent="flex-start"
      // Add additional styling as needed
    >
      {name}
    </Button>
  );
};

export default SidebarButton;
