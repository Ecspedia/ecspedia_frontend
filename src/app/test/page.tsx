'use client';
import { Button, TextField } from "@/components/ui";
import { Search, Mail, User, Calendar, Lock } from "lucide-react";
import { useState } from "react";

export default function TestPage() {
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dateRange, setDateRange] = useState('');

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">TextField Components Examples</h1>

            {/* TextField - Compound Component Examples */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">TextField - Compound Component Pattern</h2>

                <div className="flex flex-col gap-6">
                    {/* Example 1: Email with Icon and Label */}
                    <div>
                        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Email with Icon and Label</h3>
                        <TextField value={email} onChange={setEmail}>
                            <TextField.Icon icon={Mail} />
                            <TextField.InputWrapper>
                                <TextField.Label>Email Address</TextField.Label>
                                <TextField.Input />
                            </TextField.InputWrapper>
                        </TextField>
                    </div>

                    {/* Example 2: Username */}
                    <div>
                        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Username</h3>
                        <TextField value={username} onChange={setUsername}>
                            <TextField.Icon icon={User} />
                            <TextField.InputWrapper>
                                <TextField.Label>Username</TextField.Label>
                                <TextField.Input />
                            </TextField.InputWrapper>
                        </TextField>
                    </div>

                    {/* Example 3: Password Field */}
                    <div>
                        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Password Field</h3>
                        <TextField value={password} onChange={setPassword}>
                            <TextField.Icon icon={Lock} />
                            <TextField.InputWrapper>
                                <TextField.Label>Password</TextField.Label>
                                <TextField.Input type="password" />
                            </TextField.InputWrapper>
                        </TextField>
                    </div>

                    {/* Example 4: Read-only Date Picker */}
                    <div>
                        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Read-only Date Picker (Clickable)</h3>
                        <TextField
                            value={dateRange}
                            onChange={setDateRange}
                            readOnly
                            onClick={() => alert('Calendar would open here!')}
                        >
                            <TextField.Icon icon={Calendar} />
                            <TextField.InputWrapper>
                                <TextField.Label>Select Date Range</TextField.Label>
                                <TextField.Input />
                            </TextField.InputWrapper>
                        </TextField>
                    </div>

                    {/* Example 5: Simple Search (Right Icon) */}
                    <div>
                        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Search with Right Icon</h3>
                        <TextField value={value} onChange={setValue}>
                            <TextField.InputWrapper>
                                <TextField.Label>Search</TextField.Label>
                                <TextField.Input />
                            </TextField.InputWrapper>
                            <TextField.Icon icon={Search} />
                        </TextField>
                    </div>
                </div>
            </div>

            {/* Button Example */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Button Component</h2>
                <Button variant="secondary" className="w-32 h-10">
                    <Button.Icon icon={Search} />
                    Search
                </Button>
            </div>
        </div>
    );
}
