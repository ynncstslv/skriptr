'use client';

import LoginBtn from '@/components/LoginBtn';
import { SignedOut } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import { User } from 'lucide-react';

function HeaderProfileBtn() {
	return (
		<>
			<UserButton>
				<UserButton.MenuItems>
					<UserButton.Link
						label="Profile"
						labelIcon={<User className="size-4" />}
						href="/profile"
					/>
				</UserButton.MenuItems>
			</UserButton>
			<SignedOut>
				<LoginBtn />
			</SignedOut>
		</>
	);
}

export default HeaderProfileBtn;
