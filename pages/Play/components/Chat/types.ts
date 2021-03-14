// Types
import { Message, User } from '../../../../interfaces';

export interface ChatProps {
  onSubmit: (data: string) => void;
  messages: Message[];
  user?: User;
}