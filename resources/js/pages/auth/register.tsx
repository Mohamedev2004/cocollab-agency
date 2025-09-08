import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'brand' | 'influencer' | '';
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout title="Create an account" description="Enter your details below to create your account">
      <Head title="Register" />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              placeholder="Full name"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Select Role</Label>
            <Select
              value={data.role}
              onValueChange={(value) => setData('role', value as 'brand' | 'influencer')}
              disabled={processing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="influencer">Influencer</SelectItem>
              </SelectContent>
            </Select>
            <InputError message={errors.role} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center relative">
                <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                tabIndex={3}
                autoComplete="new-password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                disabled={processing}
                placeholder="Password"
                className="pr-10" // add padding to the right for the icon
                />
                <Button
                type="button"
                variant="ghost"
                className="absolute right-2 h-full w-8 flex items-center justify-center p-0"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
            <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <div className="flex items-center relative">
                <Input
                id="password_confirmation"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                tabIndex={4}
                autoComplete="new-password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                disabled={processing}
                placeholder="Confirm password"
                className="pr-10"
                />
                <Button
                type="button"
                variant="ghost"
                className="absolute right-2 h-full w-8 flex items-center justify-center p-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
            <InputError message={errors.password_confirmation} />
          </div>


          <Button
            type="submit"
            className="mt-2 w-full bg-[var(--color-cocollab)] hover:bg-[var(--color-cocollab)]/90 cursor-pointer"
            tabIndex={5}
            disabled={processing}
          >
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <TextLink href={route('login')} tabIndex={6}>
            Log in
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  );
}
