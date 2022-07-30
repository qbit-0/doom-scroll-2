import Layout from "./Layout";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Components/Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});
