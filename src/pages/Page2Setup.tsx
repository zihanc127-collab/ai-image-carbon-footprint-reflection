import React from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { MODELS_DATA } from '../data/modelsData';
import { ToolChoice } from '../types';
import { SelectionCard } from '../components/SelectionCard';
import { InformationCard } from '../components/InformationCard';
import { NavigationControls } from '../components/NavigationControls';

export const Page2Setup: React.FC = () => {
  const {
    selectedTool,
    customToolName,
    knowsModel,
    selectedModel,
    setToolChoice,
    setModelKnowledgeChoice,
    goNext,
    goBack
  } = useWorkflow();

  const toolOptions: { label: string; value: ToolChoice }[] = [
    { label: 'ChatGPT', value: 'ChatGPT' },
    { label: 'Gemini', value: 'Gemini' },
    { label: 'Midjourney', value: 'Midjourney' },
    { label: 'Other tool', value: 'Other tool' }
  ];

  // Validation:
  // Must select tool.
  // Must select knowsModel (yes/no).
  // If knowsModel is true, must select a model (either one of 17 or OTHER).
  const isToolSelected = selectedTool !== null;
  const isModelKnowledgeSelected = knowsModel !== null;
  const isModelSelectedIfRequired = knowsModel === false || (knowsModel === true && selectedModel !== null);

  const isValidToContinue = isToolSelected && isModelKnowledgeSelected && isModelSelectedIfRequired;

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500 py-2">
      {/* Page Title & Context */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 tracking-tight">
          Tool & Model Setup
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Commercial AI image tools are often opaque about the specific model running behind their user interface. Let's establish your setup.
        </p>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-1">
          Think about a recent creative project or activity in which you used AI to generate images. Use that experience as the basis for the following questions.
        </p>
      </div>

      {/* SECTION 1: TOOL SELECTION */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs">
        <h3 className="text-lg font-semibold text-neutral-900">
          Which tool did you use to generate images?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {toolOptions.map((opt) => (
            <SelectionCard
              key={opt.label}
              title={opt.label}
              isSelected={selectedTool === opt.value}
              onSelect={() => setToolChoice(opt.value, customToolName)}
            />
          ))}
        </div>

        {selectedTool === 'Other tool' && (
          <div className="pt-2 animate-in fade-in duration-200">
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Tool name (optional)
            </label>
            <input
              type="text"
              value={customToolName}
              onChange={(e) => setToolChoice('Other tool', e.target.value)}
              placeholder="e.g. Photoshop Generative Fill, Ideogram..."
              className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:bg-white transition-all"
            />
          </div>
        )}
      </div>

      {/* SECTION 2: MODEL KNOWLEDGE */}
      {isToolSelected && (
        <div className="space-y-5 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs animate-in fade-in duration-300">
          <h3 className="text-lg font-semibold text-neutral-900">
            Do you know the specific image model behind this tool?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SelectionCard
              title="No, I only know the tool"
              subtitle="Use representative dataset estimates"
              isSelected={knowsModel === false}
              onSelect={() => setModelKnowledgeChoice(false)}
            />
            <SelectionCard
              title="Yes, I know the model"
              subtitle="Select from measured model dataset"
              isSelected={knowsModel === true}
              onSelect={() => setModelKnowledgeChoice(true)}
            />
          </div>

          {/* BRANCH A: USER SELECTS "NO, I ONLY KNOW THE TOOL" */}
          {knowsModel === false && (
            <div className="pt-2 animate-in fade-in duration-300">
              <InformationCard text="This tool does not show enough information for an exact per-image carbon calculation. You will get a representative value from measured image-generation models instead." />
            </div>
          )}

          {/* BRANCH B: USER SELECTS "YES, I KNOW THE MODEL" */}
          {knowsModel === true && (
            <div className="space-y-4 pt-3 border-t border-neutral-100 animate-in fade-in duration-300">
              <p className="text-sm font-medium text-neutral-800">
                Select your model from the dataset:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1 pr-2 custom-scrollbar border border-neutral-100 rounded-2xl bg-neutral-50/50">
                {/* 17 models generated dynamically from dataset */}
                {MODELS_DATA.map((m) => (
                  <button
                    key={m.model}
                    type="button"
                    onClick={() => setModelKnowledgeChoice(true, m.model)}
                    className={`p-3 text-xs font-mono font-medium rounded-xl border text-left transition-all ${
                      selectedModel === m.model
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    {m.model}
                  </button>
                ))}

                {/* 18th option: Other / My model is not listed */}
                <button
                  type="button"
                  onClick={() => setModelKnowledgeChoice(true, 'OTHER')}
                  className={`p-3 text-xs font-sans font-medium rounded-xl border text-left transition-all col-span-2 sm:col-span-3 ${
                    selectedModel === 'OTHER'
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                      : 'bg-stone-100 text-neutral-800 border-stone-200 hover:bg-stone-200/80'
                  }`}
                >
                  Other / My model is not listed
                </button>
              </div>

              {selectedModel === 'OTHER' && (
                <div className="pt-2 animate-in fade-in duration-200">
                  <InformationCard text="This model data is not included in the disclosed dataset, so we will use a representative estimate instead." />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: ABOUT THE ESTIMATE */}
      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 space-y-2 text-xs text-neutral-600">
        <h3 className="font-semibold text-neutral-800 text-sm">
          About the estimate
        </h3>
        <p className="leading-relaxed">
          Energy estimates are derived from published benchmark data reported in <span className="italic">The Hidden Cost of an Image: Quantifying the Energy Consumption of AI Image Generation</span>.
        </p>
        <div>
          <a
            href="https://arxiv.org/abs/2506.17016"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-neutral-700 hover:text-neutral-900 underline font-medium transition-colors"
          >
            View data source ↗
          </a>
        </div>
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        onBack={goBack}
        nextLabel="Continue to workflow"
        onNext={goNext}
        isNextDisabled={!isValidToContinue}
        nextHelperText={!isValidToContinue ? 'Please complete tool & model selections above.' : undefined}
      />
    </div>
  );
};
