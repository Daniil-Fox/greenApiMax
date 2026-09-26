import {Flex, type FlexProps} from "@/shared/ui/Stack/Flex/Flex";

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: VStackProps) => {
    return (
        <Flex {...props} direction={'column'}/>
    );
};
