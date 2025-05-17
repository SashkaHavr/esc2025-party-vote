import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import { trpc, trpcClient } from '~/lib/trpc';

export const Route = createFileRoute('/login/')({
  beforeLoad: async () => {
    if (await trpcClient.user.get.query()) {
      throw redirect({ to: '/vote' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const loginMutation = useMutation(
    trpc.user.login.mutationOptions({ onSuccess: () => router.invalidate() }),
  );

  const [invitationCode, setInvitationCode] = useState('');
  const [name, setName] = useState('');

  const loginDisabled = !invitationCode || !name;

  return (
    <div className="flex h-[100svh] flex-col items-center justify-center gap-4 pb-40">
      <Input
        type="text"
        placeholder="Invitation code"
        className="w-72"
        value={invitationCode}
        onChange={(e) => setInvitationCode(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Your name"
        className="w-72"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        size="lg"
        disabled={loginDisabled}
        onClick={() =>
          loginMutation.mutate({ invitationCode: invitationCode, name: name })
        }
      >
        Enter voting room
      </Button>
    </div>
  );
}
