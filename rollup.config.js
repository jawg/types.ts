import serve from 'rollup-plugin-serve';
import dts from 'rollup-plugin-dts';
import TypeDoc from 'typedoc';

const port = process.env.ROLLUP_PORT || 8000;

const typedoc = {
  name: 'typedoc',
  buildStart: async () => {
    const app = new TypeDoc.Application();

    // TypeDoc will load tsconfig.json and typedoc.json files
    app.options.addReader(new TypeDoc.TSConfigReader());
    app.options.addReader(new TypeDoc.TypeDocReader());

    app.bootstrap();

    const project = app.convert();

    if (project) {
      await app.generateDocs(project, app.options.getValue('out'));
    }
  },
};

export default [
  {
    input: 'index.d.ts',
    plugins: [dts(), typedoc, serve({ host: 'localhost', port: port, contentBase: 'docs' })],
    output: [{ file: 'dist/types.d.ts' }],
  },
];
