import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '大道至简',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
          暂时没有描述
      </>
    ),
  },
  {
    title: '服务端渲染',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
          暂时没有描述
      </>
    ),
  },
  {
    title: '高性能',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        暂时没有描述
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
