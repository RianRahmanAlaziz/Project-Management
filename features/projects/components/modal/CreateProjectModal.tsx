import { useState } from 'react';
import { Check, Users } from 'lucide-react';
import {
    DateRangePicker,
    Button,
    Combobox,
    DatePicker,
    Input,
    Modal,
    MultiSelect
} from '@/components/ui';
import {
    COLORS,
    priorityOptions,
    statusOptions,
} from '@/components/constants';
import { WorkspaceMember } from '@/features/members/types/workspaceMember';
import { CreateProjectForm } from '../../types/projects';
import { useDetailWorkspace } from '@/features/workspaces/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';


interface CreateProjectModalProps {
    open: boolean;
    users: WorkspaceMember[];
    workspaceName: string;
    isSubmitting?: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    onConfirm: (data: CreateProjectForm) => Promise<void> | void;
}


export function CreateProjectModal({
    open,
    users,
    workspaceName,
    isSubmitting,
    onClose,
    onSubmit,
    onConfirm,
}: CreateProjectModalProps) {

    const [form, setForm] = useState<CreateProjectForm>({
        name: "",
        description: "",
        color: COLORS[0].bg,
        priority: "",
        status: "",
        start_date: "",
        due_date: "",
        members: [],
    });

    const userOptions = users.map((member) => ({
        value: String(member.user.id),
        label: member.user.email,
        description: member.role,
    }));

    const selectedColor = COLORS.find(c => c.bg === form.color) ?? COLORS[0];
    const initials = form.name.split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase() || "P";

    const handleSubmit = async () => {
        await onConfirm(form);
    };
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
                                        onChange={(e) =>
                                            setForm(prev => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
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
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm(prev => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        placeholder="What is this project about? Goals, scope, deliverables…"
                                        rows={4}
                                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* Members */}
                                    <MultiSelect
                                        portalled={false}
                                        label="Members"
                                        placeholder="Select members"
                                        searchable
                                        values={form.members}
                                        onValueChange={(members) =>
                                            setForm(prev => ({
                                                ...prev,
                                                members,
                                            }))
                                        }
                                        options={userOptions}
                                    />

                                    {/* Dates */}
                                    <div>
                                        <DateRangePicker
                                            label="Project duration"
                                            startDate={form.start_date}
                                            endDate={form.due_date}
                                            onChange={(startDate, endDate) => {
                                                setForm((prev) => ({
                                                    ...prev,
                                                    start_date: startDate,
                                                    due_date: endDate,
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* Priority */}
                                    <div>
                                        <Combobox
                                            placeholder="Select Priority"
                                            label={
                                                <>
                                                    Priority
                                                </>
                                            }
                                            value={form.priority}
                                            onValueChange={(value) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    priority: value,
                                                }))
                                            }
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
                                            value={form.status}
                                            onValueChange={(value) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    status: value,
                                                }))
                                            }
                                            searchable={false}
                                            options={statusOptions}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right column — meta */}
                            <div className="lg:col-span-2 space-y-4">
                                {/* Project icon preview */}
                                <div className="flex flex-col items-center gap-2 p-4 bg-background rounded-xl border border-border">
                                    <div className={`w-14 h-14 rounded-2xl ${selectedColor.bg} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                                        {initials}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Project icon</p>
                                    <div className="flex flex-wrap justify-center gap-1.5">
                                        {COLORS.map((c) => {
                                            const isSelected = form.color === c.bg;
                                            return (
                                                <button
                                                    key={c.label}
                                                    type="button"
                                                    onClick={() =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            color: c.bg,
                                                        }))
                                                    }
                                                    title={c.label}
                                                    className={`w-5 h-5 cursor-pointer rounded-md ${c.bg} flex items-center justify-center transition-all ${isSelected
                                                        ? `ring-2 ring-offset-1 ring-offset-card ${c.ring}`
                                                        : "opacity-60 hover:opacity-100"
                                                        }`}
                                                >
                                                    {isSelected && (
                                                        <Check
                                                            size={9}
                                                            className="text-white"
                                                            strokeWidth={3}
                                                        />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* Workspace */}
                                <div>
                                    <Input
                                        label="Workspace"
                                        value={workspaceName}
                                        readOnly
                                        disabled
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
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                        loading={isSubmitting}
                    >
                        Create
                    </Button>

                </div>
            </div>
        </Modal>
    )
}
