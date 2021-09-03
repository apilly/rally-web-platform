<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "../lib/components/Button.svelte"
</script>

<Meta
  title="Components/Button"
  component={Button}
  parameters={{
      actions:{handles:['click .btn']}
  }} 
  argTypes={{
    label:{control: "text"},
    size: { control: "text" },
    neutral: { control: "boolean" },
    product: { control: "boolean" },
    secondary: { control: "boolean" },
    dark: { control: "boolean" },
    leave: { control: "boolean" },
    icon: { control: "boolean" },
    text: { control: "boolean" },
    error: { control: "boolean" },
    compact: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "onClick" },
    
  }}
/>
<Template let:args>
  <Button {...args} on:click={args.onClick}>{args.label}</Button>
</Template>

<Story
  name="Large"
  args={{
    size: "lg",
    product: true,
    label: "TEST"
  }}
/>
<Story
  name="Medium"
  args={{
    size: "md",
    product: true,
    secondary: true,
    label: "Medium"
  }}
/>

<Story
  name="Small"
  args={{
    size: "sm",
    product: true,
    secondary: true,
    label: "Small"
  }}
/>

