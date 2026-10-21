export interface CaseSection {
  id: string;
  title: string;
  paragraphs: string[];
}
export interface ProjectCaseStudy {
  overviewTitle: string;
  sections: CaseSection[];
  technologyNotes: string[];
}

// Technical evidence: docs/professional-reference/. Editorial decisions: docs/QUALITY-RECOVERY.md.
export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  'occluded-pet-detection': {
    overviewTitle: 'Building an occlusion experiment',
    sections: [
      { id: 'dataset', title: 'Generating annotated training images', paragraphs: [
        'The first challenge was creating useful training examples without labeling every composite by hand. I converted Oxford-IIIT Pet segmentation masks into bounding boxes around the whole animal, with a small amount of padding. Cats and dogs share a single detection class, pet.',
        'I then built a pipeline that extracts household objects from ADE20K scene masks and places them over the training images. Category, size, and shape filters reject unsuitable objects; scaling and placement vary the obstruction, and softened mask edges blend the composite. Each generated image keeps the original whole-pet box, including the hidden part of the animal.',
        'The resulting dataset contains 3,000 synthetic examples alongside 3,312 clean training images. Validation and clean-test images stay separate. Object-to-pet area ratios guide synthesis, although they do not measure how much pet foreground is actually covered after placement.',
      ] },
      { id: 'detectors', title: 'Training and comparing detectors', paragraphs: [
        'I set up clean-only and augmented training runs for YOLOv8n and EfficientDet-D0. Using the same data preparation and evaluation sets made it possible to compare how each architecture responded to the synthetic images.',
        'YOLOv8n used Ultralytics training tools. EfficientDet required custom PyTorch data adapters and a training loop: images and boxes are resized together, batches accommodate different numbers of boxes, and validation loss determines which weights to save. Evaluation maps predictions back to the original image coordinates before computing COCO metrics.',
        'I also tested whether combining the clean and augmented EfficientDet checkpoints helped. The ensemble merges their predictions and removes overlapping lower-confidence boxes with non-maximum suppression at an IoU threshold of 0.55. DETR dataset and batching integration was explored separately; its incomplete training record keeps it outside the final comparison.',
      ] },
      { id: 'results', title: 'What the experiments revealed', paragraphs: [
        'The evaluation separates clean-image detection from transfer to 74 naturally occluded photographs containing 90 pet boxes. Mean average precision (mAP) measures detection quality, with higher values indicating better results. The overlap threshold, IoU, sets how closely a predicted box must match its annotation.',
        'Augmented YOLOv8n improved clean-test mAP across IoU 0.50–0.95 from 0.885 to 0.893. On natural occlusion, YOLOv8n performed better with clean training, while EfficientDet-D0 improved modestly with augmentation. The EfficientDet ensemble reached 0.097 mAP at IoU 0.50, below the augmented checkpoint alone.',
        'These comparisons exposed a transfer gap that clean-image evaluation alone would have missed. The real-image collection is small, and synthetic labels cover the whole animal while the real annotations describe visible regions. The experiments did not isolate the effect of that annotation difference.',
      ] },
    ],
    technologyNotes: [
      'Python, OpenCV, NumPy, and Pillow handle image preparation and compositing. PyTorch supports the custom EfficientDet training workflow; Ultralytics provides YOLOv8n, and pycocotools provides the common evaluation metrics. Notebook analysis and Matplotlib figures supported the report.',
    ],
  },
  'genetic-algorithm-hyperparameter-finder': {
    overviewTitle: 'Searching through generations',
    sections: [
      { id: 'evolution', title: 'How candidates evolve', paragraphs: [
        'I built a genetic algorithm that searches for classifier settings by evolving a population of candidates. Each candidate is a set of hyperparameter values, and its fitness is the mean cross-validation score returned by scikit-learn.',
        'Tournament selection chooses parents by comparing a sampled group of candidates. Crossover takes each parameter from either parent, while mutation can replace one value to explore a different configuration. The best candidate found across all generations is copied into the next population, so breeding cannot discard it.',
        'The optimizer records average and best-so-far fitness after each generation, then fits the selected configuration on the supplied training data. Categorical options, numeric samplers, and tuple-valued neural-network layer sizes give it several kinds of search space to work with.',
      ] },
      { id: 'compatibility', title: 'Handling dependent parameters', paragraphs: [
        'Some settings cannot be chosen independently. In logistic regression, the penalty determines which solvers are valid. I added compatibility rules to candidate creation and the genetic operators, so changing a penalty also chooses a compatible solver.',
        'For example, an L1 candidate can use liblinear or saga, while L2 permits a broader solver set. A final fitness check rejects incompatible pairs and catches selected fitting failures. Encoding that dependency in the search keeps it from repeatedly proposing combinations the estimator cannot train.',
      ] },
      { id: 'comparison', title: 'Comparing search cost and accuracy', paragraphs: [
        'I compared the optimizer with grid, randomized, and halving-grid search in classifier experiments. The final report’s diabetes classification comparison gives SVC the same test accuracy with genetic, grid, and randomized search, with substantially different elapsed times.',
        'Randomized search was slightly faster than the genetic algorithm in this run. Search budgets and fold parallelism differed, so the table describes those experiments rather than an inherent speed advantage. The custom loop evaluates candidates serially and lets scikit-learn handle parallel fitting within cross-validation.',
      ] },
    ],
    technologyNotes: [
      'Python implements selection, crossover, mutation, and compatibility handling. scikit-learn supplies classifiers, cross-validation, and baseline searches. NumPy and pandas support experiment data; Matplotlib and seaborn support fitness and result plots.',
    ],
  },
  'ai-scheduling-hard-constraints': {
    overviewTitle: 'Constructing schedules that can evolve',
    sections: [
      { id: 'representation', title: 'Tracking placements and capacity', paragraphs: [
        'Soccer games and practices compete for recurring time slots, with different capacity limits and placement restrictions. I built a Python scheduling prototype, Gengar, that combines backtracking construction with a genetic search over candidate schedules.',
        'The input describes events, available slots, incompatible pairings, unwanted times, and preferences. Internally, half-hour intervals make it possible to account for bookings that span multiple slots. Assigning an event reduces the remaining capacity in each interval it occupies; removing it restores that capacity. Games and practices keep separate capacity records.',
      ] },
      { id: 'construction', title: 'Building a schedule by branching', paragraphs: [
        'Construction starts with a partial schedule and chooses the next unassigned event. Each allowed placement creates a new branch with its own copied state. If a branch runs out of placements, search returns to an earlier choice; otherwise it continues until it finds a complete assignment.',
        'This is an OR-tree search: any one successful branch can supply the result. Cost and randomized ordering guide which children are explored first. The same construction routine creates the initial population and fills gaps in crossover children, reusing placement checks across both parts of the algorithm.',
      ] },
      { id: 'population', title: 'Combining candidate schedules', paragraphs: [
        'Crossover starts from the two lowest-cost parents, favors assignments they share, and uses their remaining choices as guidance for constructive completion. Survivor selection keeps low-cost candidates. A mutation routine attempts to move events in proportion to their contribution to the schedule penalty.',
        'The prototype connects these search mechanisms, but its objective remains incomplete: preference and section-difference terms are placeholders, and minimum-fill accounting needs correction. Parser, mutation, and constraint-integration defects also remain unresolved, so the work does not establish a validated final schedule.',
        'A central implementation challenge was keeping event identity and capacity updates consistent across the parser, placement checks, and genetic operators. Copying states simplifies backtracking, at the cost of additional memory and copying during search.',
      ] },
    ],
    technologyNotes: [
      'Python implements the scheduling representation, parser, recursive construction, and genetic operators directly. The command-line interface uses argparse; small scenario files and diagnostic output support investigation of placement behavior.',
    ],
  },
  'raspberry-pi-bare-metal': {
    overviewTitle: 'Connecting physical input to a desktop game',
    sections: [
      { id: 'gpio', title: 'Reading the controller directly', paragraphs: [
        'I wrote C firmware that reads an SNES controller through Raspberry Pi 4 GPIO registers, without an operating system. The firmware drives the latch and clock lines, then samples the data line sixteen times to reconstruct the controller state.',
        'A pressed SNES button produces a low signal. I convert those samples into a mask where a set bit means pressed, then compare it with the previous state. Only changes are sent over serial, avoiding repeated messages while a button remains held.',
        'The signaling uses a 12-microsecond latch and 6-microsecond clock half-periods. A 33,333-microsecond polling delay targets roughly 30 reads per second; it is a configured interval, not a latency measurement.',
      ] },
      { id: 'serial', title: 'Turning serial messages into actions', paragraphs: [
        'The firmware sends changed button masks as hexadecimal messages over Mini UART at 115200 baud. On the desktop, a Python decoder checks the message prefix, parses the mask, and tests button bits, including combinations of pressed buttons.',
        'I connected that decoder to an existing Pygame slide puzzle alongside its keyboard and mouse controls. Eight actions map controller input to movement, reset, solving, starting a new game, and quitting. The diagnostic decoder recognizes all twelve button bits.',
      ] },
      { id: 'environment', title: 'Firmware and host responsibilities', paragraphs: [
        'The Pi handles electrical signaling and state encoding; the desktop handles game input and rendering. That boundary keeps the firmware small and lets the host interpret a button state without depending on GPIO timing.',
        'The firmware builds with supplied AArch64 startup, linker, UART, and timer support. My contribution is the controller polling, state protocol, and Python integration. The puzzle’s board logic and animation come from Al Sweigart’s Pygame slide puzzle.',
      ] },
    ],
    technologyNotes: [
      'C accesses BCM2711 GPIO registers, and the GNU AArch64 toolchain builds the freestanding firmware. Python, pyserial, and Pygame receive the UART messages and dispatch desktop actions.',
    ],
  },
  'fullstack-restaurant-system': {
    overviewTitle: 'Accounts and bookings in one application',
    sections: [
      { id: 'application', title: 'From booking screens to stored records', paragraphs: [
        'I built a restaurant web application where customers can manage account details and reservations, browse menus and locations, and send special-event inquiries. Employee accounts provide a separate path for selected account-management operations.',
        'The React interface sends requests to an Express API, which applies the account or booking logic and reads or updates MySQL records. Shared request services keep cookie handling consistent across screens. Separating request handlers from database queries lets each workflow follow the same route from user action to stored data.',
      ] },
      { id: 'accounts', title: 'Modeling customer and employee accounts', paragraphs: [
        'Customers and employees share login details but have different relationships to the restaurant. The schema keeps common credentials in one account record and connects it to a customer or employee record. Registration checks for conflicting email and phone values and hashes passwords; login issues a JWT in an HTTP-only cookie.',
        'Selected account operations allow users to access their own record or require an employee clearance threshold. Protected handlers read current clearance from the database. These checks cover part of the API; they do not form a complete authorization layer for every business operation.',
        'Creating an account requires several related writes. The implementation attempts to undo earlier inserts when a later step fails. A database transaction would make that operation atomic and remove the risk of partially created records.',
      ] },
      { id: 'bookings', title: 'Updating a reservation’s identity', paragraphs: [
        'A reservation is identified by its customer, location, and date together. Editing any of those values changes the record’s key, so an update carries both the original values used to find it and the replacements to store. Foreign keys connect the booking to its customer and location.',
        'Special-event inquiries follow a separate workflow with request details and dates; an inquiry is not a confirmed booking. The reservation schema also stores dates while the interface accepts a time of day. Resolving that mismatch is necessary before offering dependable time-slot booking.',
      ] },
    ],
    technologyNotes: [
      'React and React Router organize the screens; Express and mysql2 connect them to direct MySQL queries. Axios shares request configuration, while bcryptjs and JWT support login. The schema design and application integration adapt tutorial patterns from BezKoder, Lama Dev, and freeCodeCamp.',
    ],
  },
  'j-minus-minus-mips-compiler': {
    overviewTitle: 'Turning language rules into assembly',
    sections: [
      { id: 'frontend', title: 'Parsing and shaping the program', paragraphs: [
        'I implemented a compiler for J--, a small language with integer and Boolean variables, functions, and structured control flow. ANTLR4 grammars define its syntax and operator precedence. Tree-shaping rules then remove punctuation and flatten grammar wrappers into an abstract syntax tree for analysis.',
        'One subtle case is the minimum signed 32-bit integer. Its positive magnitude is outside the signed range, so I fold unary minus into numeric literals before checking bounds. This lets the compiler accept the valid negative value without accepting an out-of-range positive literal.',
      ] },
      { id: 'semantics', title: 'Resolving names and checking meaning', paragraphs: [
        'Four passes build up the information code generation needs. The first collects global declarations and function signatures, allowing functions to refer to others declared later. The second walks lexical scopes and connects each name use to its declaration.',
        'The next pass propagates types through expressions and checks operators, call arguments, conditions, and return values. A final pass checks rules such as whether break appears inside a loop and whether integer literals fit in range.',
        'Those declaration links connect the frontend to the backend. A variable reference retains the identity and type established during analysis; storage layout adds the label or stack offset needed to access it in assembly.',
      ] },
      { id: 'backend', title: 'Generating calls and control flow', paragraphs: [
        'The backend assigns labels to globals, frame offsets to local variables, and shared storage to string literals. A custom stack calling convention evaluates arguments left to right, preserves frame and return registers, and returns values in $v0. Stack temporaries keep intermediate expression values safe across function calls.',
        'Labels and branches implement conditionals, loops, and nested break statements. Boolean operators short-circuit, so the right-hand expression runs only when needed. The emitter inserts delay-slot no-ops and generates six runtime wrappers for simulator input, output, and termination.',
      ] },
      { id: 'diagnostics', title: 'Catching invalid programs', paragraphs: [
        'Syntax and semantic diagnostics stop invalid programs before assembly emission. Generated code also checks division errors and catches a non-void function that reaches its end without returning. The latter complements the simpler semantic check that a return statement exists somewhere in the function.',
        'The source implements the full set of compiler stages. End-to-end execution remains unverified in the available review environment because the external AST support library was unavailable.',
      ] },
    ],
    technologyNotes: [
      'Python implements semantic analysis, storage layout, and MIPS emission. ANTLR4 supplies generated lexer and parser machinery from my grammars; the external cpsc411 library supplies tree shaping and traversal support. Make coordinates generation and compiler use.',
    ],
  },
  'climate-control-simulation': {
    overviewTitle: 'Exploring environmental feedback',
    sections: [
      { id: 'control', title: 'Responding to a target band', paragraphs: [
        'I built a desktop simulation for exploring how temperature, humidity, and soil moisture respond to environmental change and actuator settings. Users choose starting conditions, targets, and rates, then watch the simulated values and equipment states during a run.',
        'The temperature controller heats below the target band and cools above it. Both actuators turn off within three units of the target. Humidity and soil moisture each have one actuator, a humidifier or sprinkler, that activates below its lower threshold. These rules model feedback in software without physical sensors.',
      ] },
      { id: 'coordination', title: 'Coordinating independent controllers', paragraphs: [
        'Each environmental subsystem runs on its own worker with a configurable sampling interval. A separate results loop reads their values and actuator states for the Swing display. This lets temperature, humidity, and soil moisture advance at different rates.',
        'The configuration form accepts rates in minutes or hours and converts sampling intervals into worker delays. Numeric parsing reports invalid input before a run starts. The view and controller objects are connected through constructor arguments, keeping setup separate from each subsystem’s update logic.',
        'Independent timing also creates coordination work. The implementation shares mutable state with the results loop and needs stronger synchronization and worker shutdown handling; interrupting a thread alone does not reliably stop every subsystem.',
      ] },
      { id: 'history', title: 'Keeping a record of each run', paragraphs: [
        'Each display update appends elapsed time, environmental readings, and actuator states to a temporary text log. Saving copies the log to a named file and adds it to a local index. Users can reopen a previous run in a read-only results view.',
        'The live display and saved history use the same snapshots, so a run can be inspected as it progresses and revisited afterward. All simulation state and files stay local to the desktop application.',
      ] },
    ],
    technologyNotes: [
      'Java Swing and AWT provide the desktop interface and events. Java threads drive the independently sampled controllers; standard file I/O handles run logs and saved history without an external service or database.',
    ],
  },
  'family-streaming-interface': {
    overviewTitle: 'Browsing and supervision by profile',
    sections: [
      { id: 'navigation', title: 'Connecting parent and child screens', paragraphs: [
        'I built a React interface prototype for a family viewing experience. Children browse and search a local catalog, open show details, and reach a player. Parents use a separate layout to configure profiles and viewing restrictions.',
        'Nested routes connect those screens, with profile parameters and navigation state carrying the selected child, show, and episode. Shared MUI components keep cards, forms, dialogs, and notifications consistent across both layouts.',
      ] },
      { id: 'storage', title: 'Keeping settings separate for each child', paragraphs: [
        'Favorites, restricted titles, limits, and locks are saved under profile-specific browser-storage keys. That separation lets children keep different settings in the same browser. Storage helpers prevent duplicate favorites and restrictions; parent details and image previews are saved separately for the browser as a whole.',
        'The prototype has no backend account service. Account-management dialogs validate input and display simulated confirmations, while restriction checks cover selected entry points. Complete route enforcement would need additional work.',
      ] },
      { id: 'interaction', title: 'Keyboard navigation and playback controls', paragraphs: [
        'Discovery and player screens track a focus position for arrow-key navigation and activation. Custom controls connect to the browser video element for playback, seeking, volume, and fullscreen. Seeking waits for a finite video duration before converting a percentage into a playback position.',
        'Time-limit settings convert hours and minutes into stored values. Usage and viewing history are example data rather than measured watch time, and the referenced sample video is absent from the supplied project. The implemented work is the interface, navigation, and local personalization workflow.',
      ] },
    ],
    technologyNotes: [
      'React Router manages nested layouts and navigation context; MUI provides interface primitives. localStorage persists settings, FileReader supports image previews, and browser media APIs connect the player controls.',
    ],
  },
};
