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
  /**
   * One or more accepted fragment-id sequences (correct fragments only).
   * A submission is correct when it matches ANY of these exactly. Multiple
   * entries exist when a sentence has more than one grammatically valid order.
   * Every entry must be a permutation of the same correct-fragment set.
   */
  acceptedOrders: string[][];
}

export interface ChoiceActivity {
  id: string;
  kind: 'choice';
  prompt: string;
  options: { id: string; text: string }[];
  /** Id of the single correct option */
  correctOptionId: string;
  /** Shown after answering, regardless of correct/incorrect */
  explanation: string;
}

export interface SegmentSpotActivity {
  id: string;
  kind: 'segment-spot';
  prompt: string;
  /**
   * The paragraph as an ordered list of segments. `selectable` segments are
   * tappable clauses (each needs a stable id); non-selectable segments are the
   * connective, punctuation, and spacing shown as plain, inert text.
   * Concatenating every segment's `text` in order reproduces the paragraph.
   */
  segments: { id: string; text: string; selectable: boolean }[];
  /** Id of the clause the student must tap. */
  targetSegmentId: string;
}

export type ActivityData =
  | OrderActivity
  | TagMatchActivity
  | ErrorSpotActivity
  | BuildActivity
  | ChoiceActivity
  | SegmentSpotActivity;

// ─── Answer detail passed up through each engine's onComplete ─────────────────

/** Item ids in the order the student placed them. */
export interface OrderAnswer {
  userOrder: string[];
}

/** Sentence id → tag id the student assigned (null when left unmapped). */
export interface TagMatchAnswer {
  userMapping: Record<string, string | null>;
}

/** The sentence id the student picked as the error. */
export interface ErrorSpotAnswer {
  selectedSentenceId: string;
}

/** Fragment ids the student placed, in order. */
export interface BuildAnswer {
  userFragmentIds: string[];
}

/** The option id the student picked. */
export interface ChoiceAnswer {
  selectedOptionId: string;
}

/** The segment id the student tapped as the target clause. */
export interface SegmentSpotAnswer {
  selectedSegmentId: string;
}

/** Kind-tagged union assembled in Fase.tsx from each engine's answer. */
export type AnswerDetail =
  | ({ kind: 'order' } & OrderAnswer)
  | ({ kind: 'tag-match' } & TagMatchAnswer)
  | ({ kind: 'error-spot' } & ErrorSpotAnswer)
  | ({ kind: 'build' } & BuildAnswer)
  | ({ kind: 'choice' } & ChoiceAnswer)
  | ({ kind: 'segment-spot' } & SegmentSpotAnswer);
