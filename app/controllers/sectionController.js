const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { projectId } = req.params;

      const section = await Section.create({
        ...req.body,
        ProjectId: projectId,
      });

      req.flash('success', 'Seção criada com sucesso');

      return res.redirect(`/app/projects/${projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;

      const project = await Project.findById(projectId);

      const sections = await Section.findAll({
        where: { ProjectId: projectId },
      });

      const section = await Section.findById(id);

      return res.render('sections/show', {
        project,
        sections,
        currentSection: section,
      });
    } catch (err) {
      return next();
    }
  },

  async update(req, res, next) {
    try {
      const section = await Section.findById(req.params.id);

      await section.update(req.body);

      req.flash('success', 'Seção atualizada com sucesso!');
      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Section.destroy({
        where: {
          id: req.params.id,
        },
      });

      req.flash('success', 'Seção deletada com sucesso!');
      return res.redirect(`/app/projects/${req.params.projectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
