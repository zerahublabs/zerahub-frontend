import { Button } from '@/components/ui/shadcn/button';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/shadcn/dialog';
import { useAuthentication } from '@/hooks/use-auth';
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';

export default function WelcomeSign() {
	const { isSignIn, isLoading, onSignInHandler, setIsSignIn } = useAuthentication();
	const [isAcceptedTerms, setIsAcceptedTerms] = useState<boolean>(false);

	return (
		<Dialog open={isSignIn} onOpenChange={setIsSignIn}>
			<DialogContent className="w-sm">
				<DialogHeader>
					<DialogTitle className="text-center text-lg font-semibold">
						Welcome to ZeraHub
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-4 my-2">
					<div className="flex items-center gap-4">
						<Checkbox
							id="terms"
							checked={isAcceptedTerms}
							onCheckedChange={(e) => setIsAcceptedTerms(e === true)}
						/>
						<label
							htmlFor="terms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Accept terms and conditions
						</label>
					</div>
				</div>
				<DialogFooter>
					<Button
						disabled={!isAcceptedTerms || isLoading}
						onClick={onSignInHandler}
						className="w-full"
					>
						{isLoading && <LoaderCircle className="animate-spin" />}
						Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
