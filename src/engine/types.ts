export interface OrderActivity {
  id: string;
  kind: 'order';
  prompt: string;
  items: { id: string; label: string }[];
}

export interface TagMatchActivity {
  id: string;
  kind: 'tag-match';
  prompt: string;
  sentences: { id: string; text: string }[];
  tags: { id: string; label: string }[];
  /** Maps sentence id → correct tag id */
  mapping: Record<string, string>;
}

export interface ErrorSpotActivity {
  id: string;
  kind: 'error-spot';
  prompt: string;
  sentences: { id: string; text: string }[];
  /** Id of the sentence that contains the error */
  errorSentenceId: string;
  explanation: string;
}

export interface BuildActivity {
  id: string;
  kind: 'build';
  prompt: string;
  fragments: { id: string; text: string; correct: boolean }[];
  /** Correct ordered sequence of fragment ids (correct ones only) */
  correctSequence: string[];
}

export type ActivityData =
  | OrderActivity
  | TagMatchActivity
  | ErrorSpotActivity
  | BuildActivity;
