import React from 'react';
import { elemStyle } from './stylesPage';
import Typography from '@material-ui/core/Typography';
import GridChilds from 'app/components/User/forms/component/gridChilds';
import { setMenuList } from 'app/slice/layoutSlice';

export function PageContainer({ title, titleComp, RenderTitle, Content, Footer, menu, ...rest }) {
  const classes: any = elemStyle();
  React.useEffect(() => setMenuList(menu as any) as any, []);
  const _renderTitle = () => (
    <div className={classes.paperTitle}>
      <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[9, 3]}>
        <div>
          {titleComp || (
            <Typography variant="h3" color="textSecondary">
              {title || ''}
            </Typography>
          )}
        </div>
      </GridChilds>
    </div>
  );

  return (
    <div className={classes.root}>
      {titleComp ? <RenderTitle /> : _renderTitle()}
      <Content {...rest} />
      {Footer && <Footer />}
    </div>
  );
}
