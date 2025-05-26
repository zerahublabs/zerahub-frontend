import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';

export default function WelcomeSign() {
	const { isShownSignMessage, isLoading, onSignMessage } = useAuth();
	const [isAcceptedTerms, setIsAcceptedTerms] = useState<boolean>(false);

	return (
		<Dialog open={isShownSignMessage}>
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
						onClick={onSignMessage}
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
