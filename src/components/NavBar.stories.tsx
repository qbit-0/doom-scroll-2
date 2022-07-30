import NavBar from "./NavBar";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Components/NavBar",
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});
