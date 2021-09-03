<script lang="ts">
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import SidebarContainer from "../lib/layouts/main/Sidebar.svelte";
</script>

<Meta
  title="Components/Sidebar"
  component={SidebarContainer}
  argTypes={{
    test: { control: "text" },
  }}
/>

<Template let:args>
  <SidebarContainer>{args.test}</SidebarContainer>
</Template>

<Story
  name="Sidebar"
  args={{
    test:"Sample Test"
  }}
/>
