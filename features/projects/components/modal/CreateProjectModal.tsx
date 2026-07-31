import { useState } from 'react';
import { Check, Users } from 'lucide-react';
import {
    Avatar,
    Button,
    Combobox,
    DatePicker,
    Input,
    Modal,
    MultiSelect
} from '@/components/ui';
import {
    Color,
    COLORS,
    priorityOptions,
    statusOptions,
} from '@/components/constants';


interface CreateProjectModalProps {
    open: boolean;
    isSubmitting?: boolean;
    onClose: () => void;
    onSubmit?: () => void;
}


export function CreateProjectModal({
    open,
    isSubmitting,
    onClose,
    onSubmit,
}: CreateProjectModalProps) {
    const [color, setColor] = useState<Color>(COLORS[0],);
    const [startDate, setStartDate] = useState("");
    const [columnId, setColumnId] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("");
    const [members, setMembers] = useState<string[]>([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        workspace: "ws1",
        priority: "Medium",
        status: "Todo",
        dueDate: "",
        startDate: "",
    });
    const initials = form.name.split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase() || "P";
    return (
        <Modal
            open={open}
            onClose={onClose}
            size="2xl"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-border shrink-0 pb-5">
                    <div>
                        <h2 className="font-semibold">
                            Create Project
                        </h2>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className='p-1'>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            {/* Left column — main fields */}
                            <div className="lg:col-span-3 space-y-4">
                                {/* Name */}
                                <div>
                                    <Input
                                        value={form.name}
                                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        label=" Project Name *"
                                        placeholder='App Redesign'

                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="What is this project about? Goals, scope, deliverables…"
                                        rows={4}
                                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                    />
                                </div>
                                {/* Members */}
                                <div>
                                    <MultiSelect
                                        portalled={false}
                                        label="Members"
                                        placeholder="Select members"
                                        searchable
                                        values={members}
                                        onValueChange={setMembers}
                                        options={[
                                            {
                                                value: "1",
                                                label: "Rian",
                                                description: "Admin",
                                                avatar: (
                                                    <Avatar
                                                        name="Rian"
                                                        size="xs"
                                                    />
                                                ),
                                            },
                                            {
                                                value: "2",
                                                label: "John",
                                                description: "Member",
                                                avatar: (
                                                    <Avatar
                                                        name="John"
                                                        size="xs"
                                                    />
                                                ),
                                            },
                                            {
                                                value: "3",
                                                label: "Rahman",
                                                description: "Member",
                                                avatar: (
                                                    <Avatar
                                                        name="Rahman"
                                                        size="xs"
                                                    />
                                                ),
                                            },
                                            {
                                                value: "4",
                                                label: "Al",
                                                description: "Member",
                                                avatar: (
                                                    <Avatar
                                                        name="Al"
                                                        size="xs"
                                                    />
                                                ),
                                            },
                                            {
                                                value: "5",
                                                label: "Aziz",
                                                description: "Member",
                                                avatar: (
                                                    <Avatar
                                                        name="Aziz"
                                                        size="xs"
                                                    />
                                                ),
                                            },
                                            {
                                                value: "6",
                                                label: "ASD",
                                                description: "Member",
                                                avatar: (
                                                    <Avatar
                                                        name="ASD"
                                                        size="xs"
                                                    />
                                                ),
                                            },
                                        ]}
                                    />
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <DatePicker
                                            label={
                                                <>
                                                    Start date
                                                </>
                                            }
                                            value={startDate}
                                            onChange={setStartDate}
                                        />
                                    </div>
                                    <div>
                                        <DatePicker
                                            label={
                                                <>
                                                    Due date
                                                </>
                                            }
                                            value={dueDate}
                                            onChange={setDueDate}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right column — meta */}
                            <div className="lg:col-span-2 space-y-4">
                                {/* Project icon preview */}
                                <div className="flex flex-col items-center gap-2 p-4 bg-background rounded-xl border border-border">
                                    <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                                        {initials}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Project icon</p>
                                    <div className="flex flex-wrap justify-center gap-1.5">
                                        {COLORS.map(c => (
                                            <button
                                                key={c.label}
                                                onClick={() => setColor(c)}
                                                title={c.label}
                                                className={`w-5 h-5 cursor-pointer rounded-md ${c.bg} flex items-center justify-center transition-all ${color.label === c.label ? `ring-2 ring-offset-1 ring-offset-card ${c.ring}` : "opacity-60 hover:opacity-100"}`}
                                            >
                                                {color.label === c.label && <Check size={9} className="text-white" strokeWidth={3} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Workspace */}
                                <div>
                                    <Input
                                        label="Workspace"
                                        readOnly
                                    />
                                </div>

                                {/* Priority */}
                                <div>
                                    <Combobox
                                        placeholder="Select Priority"
                                        label={
                                            <>
                                                Priority
                                            </>
                                        }
                                        value={priority}
                                        onValueChange={setPriority}
                                        searchable={false}
                                        options={priorityOptions}
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <Combobox
                                        placeholder="Select Status"
                                        label={
                                            <>
                                                Status
                                            </>
                                        }
                                        value={columnId}
                                        onValueChange={setColumnId}
                                        searchable={false}
                                        options={statusOptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-2 border-t border-border pt-5">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                    >
                        Create
                    </Button>

                </div>
            </div>
        </Modal>
    )
}
