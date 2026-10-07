import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Action } from "../ui/ui";
import { ConsultationDialog } from "./consultation-dialog";
import { homeContent } from "@/lib/mock-content";
const meta = {
  title: "Library/Consultation Dialog",
  component: ConsultationDialog,
  args: {
    mode: { kind: "consultation", serviceId: "weight-loss" },
    languages: homeContent.languages,
    onClose: () => {},
  },
  render: function Render(args) {
    const [mode, setMode] = useState(args.mode);
    return (
      <>
        <Action
          onClick={() =>
            setMode(
              args.mode ?? { kind: "consultation", serviceId: "weight-loss" },
            )
          }
        >
          Open dialog
        </Action>
        <ConsultationDialog
          {...args}
          mode={mode}
          onClose={() => setMode(null)}
        />
      </>
    );
  },
} satisfies Meta<typeof ConsultationDialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Closed: Story = { args: { mode: null } };
export const Consultation: Story = {};
export const Login: Story = { args: { mode: { kind: "login" } } };
export const ValidationError: Story = { args: { initialState: "error" } };
export const Success: Story = { args: { initialState: "success" } };
export const Information: Story = {
  args: {
    mode: {
      kind: "information",
      title: "Contact Apsu",
      body: "Contact information will be supplied by the backend.",
    },
  },
};
